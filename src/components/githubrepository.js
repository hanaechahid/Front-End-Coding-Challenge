import React, { Component } from 'react';
import '../App.css';
import {getAllRepositories} from '../services/repositories';

class GithubRepository extends Component {
    constructor(props){
        super(props);
        this.state = {
            repositories: [],
            page: 0,
        };
    }
    
    componentDidMount(){
        getAllRepositories(this.state.page).then( response => {
            this.setState({ repositories: response.data.items});
        });
    }
    
    render() {
        const {repositories} = this.state;
        return (
        <div>
            {
                repositories.map(repository => {
                    let stars = repository.stargazers_count / 1000;
                    let issues = repository.open_issues_count / 1000;
                    let dateSubmited = Date.parse(new Date())  - Date.parse(repository.created_at);
                    return(
                        <div className="col m7" key={repository.id}>
                            <div className="card horizontal">
                                <div className="card-image">
                                    <img src={repository.owner.avatar_url} alt='avatar' height="500" width="100"/>
                                </div>
                                <div className="card-stacked">
                                    <div className="card-content">
                                        <h1>{repository.name}</h1>
                                        <p>{repository.description}</p>
                                        <div className="stars-issues">
                                            { stars < 1 ?
                                                <p className="stars-issues-border">stars: {repository.stargazers_count}K</p> :
                                                <p className="stars-issues-border">stars: {stars}K</p>
                                            }
                                            { issues < 1 ? 
                                                <p className="stars-issues-border">Issues: {repository.open_issues_count}K</p> :
                                                <p className="stars-issues-border">Issues: {issues}K</p>
                                            }
                                            <p> Submited { Math.floor(dateSubmited/(1000*60*60*24)) } days ago by {repository.owner.login}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        );
    }
}

export default GithubRepository;
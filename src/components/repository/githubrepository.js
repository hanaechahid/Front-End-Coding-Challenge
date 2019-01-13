import React, { Component } from 'react';
import './repository.css';

//components
import Spinner from '../spinner/spinner';

//Services
import {getAllRepositories} from '../../services/repositories';


class GithubRepository extends Component {
    constructor(props){
        super(props);
        this.state = {
            repositories: [],
            page: 1,
            hasMore: true,
            isLoading: false
        };
        // Binds our scroll event handler
        window.onscroll = () => {
            const {isLoading, hasMore} = this.state;
            // Bails early if:
            // * it's already loading
            // * there's nothing left to load
            if (isLoading || !hasMore) return;
            // Check that the page has scrolled to the bottom
            if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                this.loadMoreRepositories();
            }
        };
    }

    componentDidMount(){
        getAllRepositories(this.state.page).then( response => {
            this.setState({ repositories: response.data.items});
        });
    }

    //load more repositories 
    loadMoreRepositories = () => {
        this.setState({
            isLoading: true,
            page: this.state.page +1
        }, () => {
            getAllRepositories(this.state.page).then( response => {
                this.setState({
                    hasMore: (this.state.repositories.length < 100),
                    isLoading: false,
                    repositories: [
                        ...this.state.repositories,
                        ...response.data.items
                    ]
                });
                console.log(this.state.page);
            })
            .catch((err) => {
                this.setState({
                  isLoading: false,
                 });
            })
        });
    }
    
    render() {
        const {hasMore,isLoading,repositories} = this.state;
        return (
            <div>
                {
                    repositories.length < 1 ? <Spinner /> :
                    repositories.map((repository, index) => {
                        //Number of stars
                        const stars = repository.stargazers_count / 1000;
                        //number of issues
                        const issues = repository.open_issues_count / 1000;
                        const dateSubmited = Date.parse(new Date())  - Date.parse(repository.created_at);
                        const NDays = Math.floor(dateSubmited / (1000*60*60*24));
                        return(
                            <div className="col m7" key={repository.id + index}>
                                <div className="card horizontal">
                                    <div className="card-image">
                                        <img src={repository.owner.avatar_url} alt='avatar' height="300" width="100"/>
                                    </div>
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <h1>{repository.name}</h1>
                                            <p>{repository.description}</p>
                                            <div className="stars-issues">
                                                { stars < 1 ?
                                                    <p className="stars-issues-border">Stars: {repository.stargazers_count}K</p> :
                                                    <p className="stars-issues-border">Stars: {stars.toFixed(1)}K</p>
                                                }
                                                { issues < 1 ? 
                                                    <p className="stars-issues-border">Issues: {repository.open_issues_count}K</p> :
                                                    <p className="stars-issues-border">Issues: {issues.toFixed(1)}K</p>
                                                }
                                                <p> Submited {NDays } days ago by {repository.owner.login}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {   isLoading && <Spinner /> }
                {   !hasMore && <h5 align="center">You did it! You reached the end!</h5> }
            </div>
        );
    }
}

export default GithubRepository;
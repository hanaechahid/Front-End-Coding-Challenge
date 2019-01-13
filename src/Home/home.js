import React, { Component} from 'react';

import {getAllRepositories} from '../services/repositories';
import GithubRepository from '../components/repository/githubrepository';
import Spinner from '../components/spinner/spinner';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            repositories: [],
            page: 1,
            hasMore: true,
            isLoading: false
        };

        //bind scroll event handller
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

    render () {
        const { isLoading, hasMore, repositories } = this.state;
        return(
            <div>
                {
                    repositories.length < 1 ? <Spinner /> :
                    repositories.map((repository, index) => {
                    return (
                        <GithubRepository repository={repository} key={repository.id + index} />
                    )
                })}
                
                {   isLoading &&  <Spinner /> }
                {   !hasMore && <h5 align="center">You did it! You reached the end!</h5> }
            </div>
        )
    }
}

export default Home;
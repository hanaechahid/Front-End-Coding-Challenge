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
            isLoading: false,
            hasMore: true
        };
    }

    componentDidMount(){
        getAllRepositories(this.state.page).then( response => {
            this.setState({ repositories: response.data.items});
        });
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    //scroll event handler
    onScroll = () => {
        const {isLoading, hasMore} = this.state;
        // Bails early if:
        // * it's already loading
        if (isLoading || !hasMore) return;
        if ( (window.innerHeight + window.scrollY ) >= document.body.offsetHeight ) 
        {
          this.loadMoreRepositories();
        }
    }

    //load more repositories 
    loadMoreRepositories = () => {
        this.setState({
            isLoading: true,
            page: this.state.page +1
        }, () => {
            getAllRepositories(this.state.page).then( response => {
                this.setState({
                    hasMore: (this.state.page <= 23) ,
                    isLoading: false,
                    repositories: [
                        ...this.state.repositories,
                        ...response.data.items
                    ]
                });
                console.log(this.state.page, this.state.hasMore);
                console.log(this.state.repositories);
            })
            .catch((err) => {
                this.setState({
                  isLoading: false,
                 });
            })
        });
    }

    render () {
        const { isLoading, repositories } = this.state;
        return(
            <div>
                {
                    repositories.length < 1 ? <Spinner /> :
                    repositories.map( (repository) => {
                        return (
                            <GithubRepository repository={repository} key={repository.id } />
                        )
                    })
                }
                {   isLoading &&  <Spinner /> }
            </div>
        )
    }
}

export default Home;
import React from 'react';
import './repository.css';

const GithubRepository = (props) => {
    const { repository} = props;
    //Number of stars
    const stars = repository.stargazers_count > 999 ?  (repository.stargazers_count/ 1000).toFixed(1)+'k' : repository.stargazers_count;
    //number of issues
    const issues = repository.open_issues_count > 999 ? (repository.open_issues_count / 1000).toFixed(1)+'k' : repository.open_issues_count;
    const dateSubmited = Date.parse(new Date())  - Date.parse(repository.created_at);
    const NDays = Math.floor(dateSubmited / (1000*60*60*24));
    return (
        <div>
            <div className="col m7">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={repository.owner.avatar_url} alt='avatar' height="300" width="100"/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <h1>{repository.name}</h1>
                                <p>{repository.description}</p>
                            <div className="stars-issues">
                                <p className="stars-issues-border">Stars: {stars}</p>
                                <p className="stars-issues-border">Issues: {issues}</p>
                                <p> Submited {NDays } days ago by {repository.owner.login}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GithubRepository;
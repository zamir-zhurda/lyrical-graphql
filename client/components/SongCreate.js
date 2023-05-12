import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from "react-router";
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {

    constructor(props){
        super(props);
        this.state = { title: ''}
    }

    handleOnSubmit (event) {
       event.preventDefault();

     console.log("props: ",this.props);
    this.props.mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongs }]
    }).then(() => {
        //after the mutation has finished we redirect into list page
        hashHistory.push('/');
    }).catch(() => {
        //handling errors
    })
    
    }

    render() {
        return (
            <div className='container'>
                <Link to="/" >Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.handleOnSubmit.bind(this)}>
                    <label >Song Title</label>
                    <input 
                    onChange={event => this.setState({title: event.target.value}) } 
                    value={this.state.value}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
  mutation AddSong ($title : String ) {
    addSong(title: $title) {
        id,
        title
    }
 }
`;

export default graphql(mutation)(SongCreate);
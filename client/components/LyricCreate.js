import React, { Component } from "react";
import addLyricToSong from "../mutations/addLyricToSong";
import fetchSong from "../queries/fetchSong";
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props){
        super(props);

        this.state = { content: '' };
    }

    handleOnSubmit (event) {
        event.preventDefault();

        this.props.mutate({
            variables: { content: this.state.content, songId: this.props.songId }
            
        }).then(() => this.setState({ content: '' }))

    }

    render(){
        return (
            <form onSubmit={this.handleOnSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input 
                value={this.state.content}
                onChange={event => this.setState({ content: event.target.value })}
                />
            </form>
        );
    }
}

export default graphql(addLyricToSong)(LyricCreate);


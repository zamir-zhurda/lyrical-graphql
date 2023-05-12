import React, { Component } from "react";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";
import deleteSong from "../mutations/deleteSong";

 class SongList extends Component {

    onSongDelete(id) {
        this.props.mutate({
            variables : { id },
            // refetchQueries: [{ query: fetchSongs }]
        }).then(() => this.props.data.refetch())
    }

    renderSongs() {
        const { loading, songs } = this.props.data;

        if(loading) { 
            return <div>loading...</div> 
        }

        return !loading && songs.map(({id, title}) => {
            return (
               
                <div>
              
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>{title}</Link>
                    
                    <i
                    className="material-icons"
                    onClick={() => this.onSongDelete(id)}
                    >
                        delete
                    </i>
                </li>
                </div>
            );
        });
    }

    render() {
       
       return (
        <div className="container">
  <h4> Song List </h4>
        <ul className="collection" >
            {this.renderSongs()}
        </ul>
         <Link to="/songs/new" className="btn-floating btn-large red right">
             <i className="material-icons">add</i>
        </Link>
        </div>
      
    )
  }
}

export default graphql(deleteSong)(
    graphql(fetchSongs)(SongList)
);
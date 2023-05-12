import React, { Component } from "react";
import likeLyric from "../mutations/likeLyric";
import { graphql } from 'react-apollo';

class LyricList extends Component {

    onLike(lyricId, likes){
        console.log("lyricId: ",lyricId);
        this.props.mutate({ 
            variables: { id: lyricId } ,
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: lyricId,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })

    }

    renderLyrics() {
        const { lyrics } = this.props;
         return lyrics.map(lyric => {
            return (
                <li key={lyric.id} className="collection-item">
                    {lyric.content}

                    <div className="vote-box">
                        <i className="material-icons" 
                        onClick={() => this.onLike(lyric.id, lyric.likes)}
                        >thumb_up</i>
                        {lyric.likes}
                     </div>
                </li>
               
          );
        });
    }

    render(){
     
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

export default graphql(likeLyric)(LyricList);
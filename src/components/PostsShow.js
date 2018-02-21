import React from 'react'
import  { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'

class PostsShow extends React.Component {
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchPost(id)
    }

    onDeleteClick = () => {
        const { id } = this.props.match.params
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { post } = this.props
        if (!post) {
            return <div>Loading...</div>
        }
        return(
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick}
                >
                    Delete Post
                </button>
                <div className="container showPost">
                    <div className="col align-self-center">
                        <h1 className="display-4">{post.title}</h1>
                            {post.points.map((point, index) => {
                                return (
                                    <ol key={point.id} className="list-group list-group-flush list-inlines">
                                        <li className="list-group-item">
                                            <div>
                                                <p className="lead">{point.content}</p>
                                            </div>
                                        </li>
                                    </ol>
                                )
                            })}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post : state.posts[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{fetchPost, deletePost})(PostsShow)
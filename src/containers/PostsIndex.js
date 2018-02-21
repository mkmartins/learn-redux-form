import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import { Link } from 'react-router-dom'

class PostsIndex extends React.Component {
    componentDidMount() {
        this.props.fetchPosts()
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li key={post.id} className="list-group-item">
                    <Link to={`/posts/${post.id}`} className="indexTitles">
                        <h1 className="display-4">{post.title}</h1>
                    </Link>
                    <footer className="blockquote-footer">
                        {post.points.length} arguments.
                    </footer>
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <h3>"A cool quote will go here!"</h3>
                <ol className="list-group list-group-flush list-inlines">
                    {this.renderPosts()}
                </ol>
            </div>
        )
    }
}

const  mapStateToProps = ({posts}) => {
    return {posts}
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex)
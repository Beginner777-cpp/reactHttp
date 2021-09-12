import React, { Component } from "react";
import "./App.css";
import axios from 'axios';

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts })
  }

  handleAdd = async () => {
    const newPost = { title: 'a', body: 'b' };
    const { data: post } = await axios.post(apiEndpoint, newPost);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts;
    const index = posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
    post.title = 'updated';
    try {
      const updatedPost = await axios.put(apiEndpoint + '/' + post.id, post)
      // const updatedPost = await axios.patch(apiEndpoint + '/' + post.id, {title: post.title});
      // throw new Error('error');
    } catch (error) {
      console.log(error);
      this.setState({ posts: originalPosts });
    }


  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      const deletedPost = await axios.delete(apiEndpoint + '/' + post.id);
    } catch (error) {
      console.log(error);
      this.setState({ posts: originalPosts })
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;






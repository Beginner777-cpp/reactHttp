import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import http from "./services/httpService.js";
import config from "./config.json";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const newPost = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, newPost);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts;
    const index = posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
    post.title = "updated";
    try {
      const updatedPost = await http.put(
        config.apiEndpoint + "/" + post.id,
        post
      );
      // const updatedPost = await http.patch(config.apiEndpoint + '/' + post.id, {title: post.title});
      // throw new Error('error');
    } catch (error) {
      console.log(error);
      this.setState({ posts: originalPosts });
    }
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      const deletedPost = await http.delete(config.apiEndpoint + "/" + post.id);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        toast.error("Post has already been deleted");
      }

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
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
            {this.state.posts.map((post) => (
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

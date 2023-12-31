import React, { Component } from "react";
import appContext from "../../../context/app";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class PostArticle extends Component {
  static contextType = appContext;
  state = {
    article: {
      name: "",
      content: "",
      read_time: "",
      img_url: "",
      category: "",
    },
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/article",
      this.state.article
    );
    console.log(response);
  };
  handleChange = (e) => {
    const input = e.currentTarget;
    const article = { ...this.state.article };
    article[input.name] = input.value;
    this.setState({ article });
  };
  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={`theme-text-${this.context.mode}`}
      >
        <div>
          <label htmlFor="name">نام مقاله</label>
          <input
            onChange={this.handleChange}
            value={this.state.article.name}
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label htmlFor="content">محتوای مقاله </label>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      this.setState(prevState => ({
                        article: {
                          ...prevState.article,
                          content: data
                        }
                      }));
                    }}
                    
                />
        </div>
        <div>
          <label htmlFor="read_time">زمان مطالعه</label>
          <input
            onChange={this.handleChange}
            value={this.state.article.read_time}
            type="number"
            id="read_time"
            name="read_time"
          />
        </div>
        <div>
          <label htmlFor="img_url">آدرس تصویر</label>
          <input
            onChange={this.handleChange}
            value={this.state.article.img_url}
            type="file"
            id="img_url"
            name="img_url"
          />
        </div>
        <div>
          <label htmlFor="category">دسته بندی</label>
          <input
            onChange={this.handleChange}
            value={this.state.article.category}
            type="text"
            id="category"
            name="category"
          />
        </div>
        <button> افزودن</button>
      </form>
    );
  }
}

export default PostArticle;

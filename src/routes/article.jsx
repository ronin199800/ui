import React, { Component } from "react";
import Articles from "../components/article/articles";
import appContext from "../context/app";
import "./article.css";
import ArticleCategory from "../components/article/article-category/articleCategory";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import CtaArticle from "../components/ctaArticle/ctaArticle";
import axios from "axios";
import { digitsEnToFa } from "@persian-tools/persian-tools";

class Article extends Component {
  static contextType = appContext;
  state = {
    articles: [],
    isLoaded: true,
    categories: [],
    currentPage: 1,
    totalPages: 0,
  };
  async componentDidMount() {
    this.fetchArticles();
    this.fetchCategories();
  }

  fetchArticles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/article?page=${this.state.currentPage}`
      );
      const totalPages = response.data.totalPages || 0;

      setTimeout(() => {
        this.setState({
          articles: response.data.data,
          totalPages,
          isLoaded: false,
        });
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/article/category"
      );
      this.setState({ categories: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };
  nextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState(
        { currentPage: currentPage + 1, isLoaded: true },
        this.fetchArticles
      );
    }
  };

  previousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState(
        { currentPage: currentPage - 1, isLoaded: true },
        this.fetchArticles
      );
    }
  };
  handleFilter = async (categoryId) => {
    try {
      this.setState({ isLoaded: true ,currentPage:1});
      const response = await axios.get(
        `http://localhost:5000/api/article?category=${categoryId}`
      );

      setTimeout(() => {
        this.setState({
          articles: response.data.data,
          isLoaded: false,
        });
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { articles, isLoaded, categories, currentPage, totalPages } =
      this.state;
      const disablePrevious = currentPage === 1;
      const disableNext = articles.length < 12;

    return (
      <>
        <div className="article-router-body">
          <Breadcrumb />
          <div className="article-body-container">
            <div style={{ position: "relative" }}>
              <ArticleCategory
                categories={categories}
                OnCategory={this.handleFilter}
                isLoaded={isLoaded}
              />
              <CtaArticle />
            </div>
            <div>
              <Articles articles={articles} isLoaded={isLoaded} />
            </div>
          </div>
          <div className="pagination">
            <span style={{
              color: `var(--text-mute-${this.context.mode})`
            }}>
              {`${digitsEnToFa(currentPage)} از ${digitsEnToFa(totalPages)}`}{" "}
              صفحه
            </span>

            <div className="pagination-btn">
              <button onClick={this.previousPage} disabled={disablePrevious}>
              <span className="material-symbols-rounded">
                  navigate_next
                </span>
              </button>
              <button
                onClick={this.nextPage}
                disabled={disableNext}
              >
                <span className="material-symbols-rounded">
                  navigate_before
                </span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Article;

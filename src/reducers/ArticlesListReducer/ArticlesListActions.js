const ArticlesListActions = {
  setLoad: () => ({ type: 'SET_LOAD' }),

  getArticles: (data) => ({ type: 'GET_ARTICLES_LIST', data }),

  changePage: (page) => ({ type: 'CHANGE_PAGE', page }),

  failDownloadArticles: (error) => ({ type: 'FAIL_DOWNLOAD_LIST', error }),
}

export default ArticlesListActions

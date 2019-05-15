import React from "react";
import fetch from "isomorphic-fetch";
class Infinitescroll extends React.Component {
  state = {
    data: [],
    per: 3,
    page: 1,
    total_pages: null
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadUser
    );
    console.log(this.state);
  };

  componentWillMount() {
    this.loadUser();
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map(user => {
            return (
              <li key={user.id}>
                <div>
                  <div className="user-item">
                    <img src={user.avatar} className="img-response" />
                    <div>
                      <div>
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="email">{user.email}</div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button
          onClick={e => {
            this.loadMore();
          }}
        >
          Load More
        </button>
      </div>
    );
  }

  loadUser = () => {
    const { per, page, data } = this.state;
    const url = `https://reqres.in/api/users?per_page=${per}&page=${page}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          data: [...data, ...json.data],
          scrolling: false,
          total_pages: json.total_pages
        });
      });
  };
}

export default Infinitescroll;

App = React.createClass({

  getInitialState() {
      return {
          loading: false,
          searchingText: '',
          gif: {}
      };
  },

  handleSearch: function(searchingText) {
      this.setState({
        loading: true
      });
      this.getGif(searchingText, function(gif) {
        this.setState({
          loading: false,
          gif: gif,
          searchingText: searchingText
        });
      }.bind(this));
    },

    getGif: function(searchingText) {
      return new Promise(
        function(resolve, reject) {
          var GIPHY_API_URL = 'https://api.giphy.com';
          var GIPHY_PUB_KEY = "098760c7a8d44d66a1b32a31b6e1ce81";
          var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onload = function() {
              if (xhr.status === 200) {
                resolve(
                  var data = JSON.parse(xhr.responseText).data;
                   var gif = {
                       url: data.fixed_width_downsampled_url,
                       sourceUrl: data.url
                );
              } else {
                reject(console.log("error"));
              }
          };

          xhr.send();
        })
      },

    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='https://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />

          </div>
        );
    }




});

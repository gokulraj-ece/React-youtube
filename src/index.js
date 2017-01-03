import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBmdZz_796CW4kpfq0ox5UFCGWsTi8pVDI';

//creating a react component
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('puppies');
    }

  videoSearch(term) {
    YTSearch({
        key: API_KEY,
        term: term
    }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
    // (videos) => this.setState({ videos }));
    // (data) => this.setState({ videos: data }));
  }

    render() {
      const videoSearch = _.debounce((term) => { this.videoSearch(term); }, 1000);
      //passing a function to manipulate other components
      // passing props from parent to child components (props of jsx elements)
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                  onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                  videos={this.state.videos} />
            </div>
        );
    }
    // passing data from parent obj (App) to child (VideoList)
    // (i.e) passing props 'videos' to VideoList
}
//place the generated HTML on the DOM
ReactDOM.render(<App />, document.querySelector('.container'));

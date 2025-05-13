import React, { useEffect, useState } from 'react'
import "./YouTube.css"

// a function that convert (or "decode") HTML entities escaped by YoutTube API into readable characters 
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

                    


 const API_KEY = import.meta.env.VITE_API_KEY;
 const cnn_id = "UCupvZG-5ko_eiXAupbDfxWw"
 const apple_id = "UCE_M8A5yxnLfW0KghEeajjw"
 const ebs_id = "UCVcc_sbg3AcXLV9vVufJrGg"

 

function YouTube() {
 const [youTubeVideos, setVideos] = useState([]);
 const [sortBy, setSort] = useState("date");
 const [videoTitle, setVideoTitle] = useState("Latest Videos")

  useEffect(
    ()=>{
       fetch(
         // `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${apple_id}&part=snippet,id&order=${sortBy}&maxResults=9`

         `${import.meta.env.BASE_URL}youtube.json`
       )
         .then((response) => response.json())
         .then((data) => {
           const youTubeVideosData = data.items;
           console.log(youTubeVideosData);
           setVideos(youTubeVideosData);
         });
    },
    [sortBy]
  )

  return (
    <>
      <div className="youtubeVideosWrapper">
        <div className="container">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12">
              <div className="title-wraper bold video-title-wrapper">
                {videoTitle}
              </div>

              <div className="d-flex justify-content-start mb-4">
                <select
                  className="form-select w-auto"
                  value={sortBy}
                  onChange={(e) => { 
                    setSort(e.target.value)                    
                    if(e.target.value === "date") setVideoTitle("Latest Videos")
                    if(e.target.value === "viewCount") setVideoTitle("Most Viewed Videos");
                  }}
                >
                  <option value="date">Latest</option>
                  <option value="viewCount">Most viewed</option>
                </select>
              </div>
            </div>

            {youTubeVideos.map((singleVideo, i) => {
              let vidId = singleVideo.id.videoId;
              let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
              let videoThumbnail = singleVideo.snippet.thumbnails.high.url;
              let videoTitle = singleVideo.snippet.title;
              let videoDesc = singleVideo.snippet.description;
              let timestamp = singleVideo.snippet.publishedAt;
              const dateOnly = timestamp.split("T")[0];

              return (
                <div key={i} className="col-sm-12 col-md-4">
                  <div className="singleVideoWrapper">
                    <div className="videoThumbnail">
                      <a href={vidLink} target="_blank">
                        <img src={videoThumbnail} />
                      </a>
                    </div>

                    <div className="videoInfoWrapper">
                      <div className="videoTitle">
                        <a href={vidLink} target="_blank">
                          {decodeHTML(videoTitle)}
                        </a>
                      </div>

                      <div className="videoDesc">{videoDesc}</div>
                    </div>
                    <div className='date'>{dateOnly}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default YouTube

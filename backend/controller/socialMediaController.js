import asyncHandler from "../middlewares/asyncHandler.js";
import axios from "axios";

const getChannelVideos = asyncHandler(async(req,res)=>{
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: process.env.YOUTUBE_DATA_V3_KEY,
            channelId: process.env.CHANNEL_ID,
            part: 'snippet',
            order: 'date',
            maxResults: 10,
          },
        });
    
        res.json(response.data.items);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
})

const getInstagramProfileDetails = asyncHandler(async(req, res)=> {
  const options = {
    method: 'GET',
    url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/info',
  params: {
    username_or_id_or_url: process.env.INSTA_USER,
    url_embed_safe: 'true'
  },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_INSTA_HOST
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json({
      followers: response?.data?.data?.follower_count,
      following: response?.data?.data?.following_count,
      username: response?.data?.data?.username,
      profilePic: response?.data?.data?.profile_pic_url,
      totalPosts: response?.data?.data?.media_count
    });
  } catch (error) {
    console.log(error)
    res.status(500)
    throw new Error('Something went wrong! Please try again.')
  }
})

const getInstaTopPosts = asyncHandler(async(req, res)=> {
  const options = {
    method: 'GET',
    url: `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts`,
    params: {
      username_or_id_or_url: process.env.INSTA_USER,
      url_embed_safe: 'true'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_INSTA_HOST
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response?.data?.data?.items);
  } catch (error) {
    res.status(500)
    throw new Error('Something went wrong! Please try again.')
  }
})

const instaProxy = asyncHandler(async(req,res)=> {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching the image');
  }
})

export {getChannelVideos, getInstagramProfileDetails, getInstaTopPosts, instaProxy};
import React from 'react';
import {profileApi} from './api/api';


const ADD_POST =  'ADD-POST';
const ADD_NEW_POST =  'ADD-NEW-POST';
const SET_PROFILE = 'SET-PROFILE';

let initialSate = {
	posts: [
				   {id: 1, message: 'post 1', likesCount: 12},
				   {id: 2, message: 'post 2', likesCount: 20}
			   ],
  newValue: '',
	profile: null,
	
}

export const profileReducer = (state = initialSate, action) => {

  switch(action.type){

  	case ADD_POST:{
			return {...state, posts: [...state.posts, {id: 5, message: state.newValue, likesCount: 25}], newValue: ''};
     }

	case ADD_NEW_POST:{
		    return {...state, newValue: action.newPost};
	}
	case SET_PROFILE:{
		return {...state, profile: action.profile};
	}

	default:
	return state;

  }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const addNewPostActionCreator = (val) => ({type: ADD_NEW_POST, newPost: val});

const setProfile = (profile) => ({type: SET_PROFILE, profile:profile});

export const getProfileThunk = (id) => {
	return (dispatch) => {
		 profileApi.getProfile(id).then(resp => {		
			dispatch(setProfile(resp.data));
		});
	}
}
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const searchGh = async () => console.log(await searchGithub())

  searchGh()
  return (
  <>
    <h1>CandidateSearch</h1>;
  </>
  )
};

export default CandidateSearch;

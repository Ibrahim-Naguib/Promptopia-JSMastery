"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, searchText, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data
        .filter(
          (card) =>
            card.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
            card.tag.toLowerCase().includes(searchText.toLowerCase()) ||
            card.creator.username
              .toLowerCase()
              .includes(searchText.toLowerCase())
        )
        .map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            searchText={searchText}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a profile, prompt, or tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        searchText={searchText}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;

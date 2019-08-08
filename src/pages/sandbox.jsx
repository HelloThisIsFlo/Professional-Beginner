import React from "react";
import "./sandbox.scss";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

const FakePostEntry = () => {
  const wordsInTitle = Math.floor(Math.random() * 3 + 3);
  return (
    <li className="post-entry">
      <h3>{lorem.generateWords(wordsInTitle)}</h3>
      <p>{lorem.generateParagraphs(1)}</p>
    </li>
  );
};

export default () => (
  <div className="sandbox">
    <div className="container">
      <header>
        <h1>Header Title</h1>
      </header>
      <main>
        <ul>
          <FakePostEntry />
          <FakePostEntry />
          <FakePostEntry />
          <FakePostEntry />
          <FakePostEntry />
          <FakePostEntry />
          <FakePostEntry />
          <FakePostEntry />
          <FakePostEntry />
        </ul>
      </main>
      <aside>SIDEBAR</aside>
    </div>
  </div>
);

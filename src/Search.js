import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Search.css';

export default function Search() {
  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    window.location = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="search-container">
      <Form>
        <Form.Group>
          <Form.Control
            id="searchbar"
            type="text"
            placeholder="Search something..."
            size="lg"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          className="search-submit-button"
          variant="primary"
          type="submit"
          size="lg"
          onClick={onSubmit}
        >
          Search
        </Button>
      </Form>
    </div>
  );
}

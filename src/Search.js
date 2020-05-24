import React from 'react';
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './Search.css';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  const onSubmit = e => {
    e.preventDefault();
    history.push(`/search?q=${encodeURIComponent(searchText)}`);
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
            value={searchText || query}
            onChange={e => setSearchText(e.target.value)}
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
      {!!query && (
        <p>
          Unfortunately, no results were found for{' '}
          <span className="search-query-name" dangerouslySetInnerHTML={{ __html: query }} />.
        </p>
      )}
      <p>
        <Link to="/">Back to homepage</Link>
      </p>
    </div>
  );
}

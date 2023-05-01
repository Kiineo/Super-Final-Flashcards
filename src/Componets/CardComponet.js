function cardComponet({
  handleFormSubmit,
  header,
  deckId,
  Title,
  cardId,
  formData,
  handleInput,
}) {
  return (
    <form onSubmit={handleFormSubmit}>
      <h3>{header}</h3>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{Title}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {cardId && `Edit Card ${cardId}`}
            {!cardId && `Add Card`}
          </li>
        </ol>
      </nav>
      <label htmlFor="front">front</label>
      <textarea
        type="text"
        name="front"
        id="front"
        value={formData.front}
        onChange={handleInput}
      />
      <label htmlFor="back">back</label>
      <textarea
        type="text"
        name="back"
        id="back"
        value={formData.back}
        onChange={handleInput}
      />
      <input type="submit" />
    </form>
  );
}
export default cardComponet;

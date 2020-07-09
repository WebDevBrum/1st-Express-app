const express = require("express");
const router = express.Router();
const { data } = require("../data/flashcardData.json"); //equiv to data.data also node directly reads and parses so you dont have to
const { cards } = data; // equiv to  data.data.cards

router.get("/", (req, res) => {
  const numberOfCards = cards.length;
  const flashCardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashCardId}`);
});

router.get("/:id", (req, res) => {
  //value of :id parameter or otherwise will be stored in the request object params property (can all id something else)
  //cards cut out from / as directed from cards path in app.js
  const { side } = req.query; // so rq.query.side side=answer side=question
  const { id } = req.params; //so req.params.id
  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }
  const name = req.cookies.username;
  const text = cards[id][side]; // so if side=question cards[id].question
  const { hint } = cards[id]; //so cards[id].hint
  const templateData = { id, text, name, side };

  if (side === "question") {
    templateData.hint = hint; //this adds hint to the template data object
    templateData.sideToShow = "answer";
    templateData.sideToShowDisplay = "Answer";
  } else if (side === "answer") {
    templateData.sideToShow = "question";
    templateData.sideToShowDisplay = "Question"; //changes template lits in card.pug
  }

  res.render(
    "card",
    templateData //which calls text and hint
    /*{
    prompt: cards[req.params.id].question, //so depends on say cards/0 etc (prompt changed to text above constants replace thia commented out section)
    hint: cards[req.params.id].hint,
  }*/
  );
});

module.exports = router;

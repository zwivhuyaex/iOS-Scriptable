/**
 * Daily Quotes Widget
 * Developer: [Your Name]
 *
 * This script creates a widget that displays a new inspirational quote or a random fact every day.
 * The quotes or facts are fetched from an API and displayed in a widget on the home screen of an iOS device.
 * The widget updates automatically and shows a different quote or fact each time.
 */

const widget = new ListWidget();
widget.setPadding(16, 16, 16, 16); // Set padding for the widget

// Configure widget properties like background color, font, etc.
const bgColor = new LinearGradient();
bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
bgColor.locations = [0.0, 1.0];
widget.backgroundGradient = bgColor;
widget.addSpacer();

// Add title to the widget
const titleText = widget.addText("Random Quotes");
titleText.font = Font.semiboldSystemFont(16);
titleText.textColor = new Color("#ffffff");
titleText.textOpacity = 0.8;
titleText.centerAlignText();

widget.addSpacer(10);

// Add text to the widget
const quoteText = widget.addText("Loading...");
quoteText.font = Font.mediumSystemFont(18);
quoteText.textColor = new Color("#ffffff");
quoteText.textOpacity = 0.8;
quoteText.centerAlignText();
quoteText.lineLimit = 4;

widget.addSpacer(10);

const authorText = widget.addText("");
authorText.font = Font.lightSystemFont(14);
authorText.textColor = new Color("#ffffff");
authorText.textOpacity = 0.6;
authorText.centerAlignText();
authorText.lineLimit = 1;

widget.addSpacer();

if (config.runsInWidget) {
  Script.setWidget(widget);
  Script.complete();
} else {
  widget.presentMedium();
}

// Fetching quotes
const apiUrl = "https://type.fit/api/quotes"; // API endpoint
let quotes = [];

async function fetchQuotes() {
  const response = await new Request(apiUrl).loadJSON();
  quotes = response;
}

await fetchQuotes();

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteText.text = randomQuote.text;
  authorText.text = "- " + (randomQuote.author || "Unknown");
}

displayRandomQuote();

if (config.runsInWidget) {
  Script.setWidget(widget);
  Script.complete();
}

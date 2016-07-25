"use strict";

var LibraryListEntry = function LibraryListEntry() {
  return React.createElement(
    "div",
    { className: "sound-entry" },
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        undefined.props.library
      )
    )
  );
};

window.LibraryListEntry = LibraryListEntry;
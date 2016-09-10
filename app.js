var options =  {
  IndentSize: 4,
  TabSize: 4,
  IndentStyle: ts.IndentStyle.Smart,
  NewLineCharacter: '\n',
  ConvertTabsToSpaces: true,
  InsertSpaceAfterCommaDelimiter: true,
  InsertSpaceAfterSemicolonInForStatements: true,
  InsertSpaceBeforeAndAfterBinaryOperators: true,
  InsertSpaceAfterKeywordsInControlFlowStatements: true,
  InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
  InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
  InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
  InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
  PlaceOpenBraceOnNewLineForFunctions: false,
  PlaceOpenBraceOnNewLineForControlBlocks: false,
};

var FormatBox = React.createClass({
  format: function(input, options)  {
    var rulesProvider = new ts.formatting.RulesProvider();
    rulesProvider.ensureUpToDate(options);

    var sourceFile = ts.createSourceFile("input", input, ts.ScriptTarget.Latest);
    var edits = ts.formatting.formatDocument(sourceFile, rulesProvider, options);

    return this.applyEdits(input, edits);
  },

  applyEdits: function(text, edits) {
    // Apply edits in reverse on the existing text
    let result = text;
    for (let i = edits.length - 1; i >= 0; i--) {
      let change = edits[i];
      let head;
      if (typeof change.span.start === "number") {
        head = result.slice(0, change.span.start);
      } else {
        // backward compat for typescript-1.4.1
        head = result.slice(0, change.span.start());
      }
      let tail;
      if (typeof change.span.start === "number") {
        tail = result.slice(change.span.start + change.span.length);
      } else {
        // backward compat for typescript-1.4.1
        tail = result.slicechange.span.start() + change.span.length();
      }
      result = head + change.newText + tail;
    }
    return result;
  },

  getInitialState: function() {
    return {text: '', formattedText: '', options: options};
  },

  handleTextChange: function(e) {
    e.preventDefault();

    var text = e.target.value;
    var formattedText = this.format(text, this.state.options);

    this.setState({
      text: text,
      formattedText: formattedText,
    });
  },

  render: function() {
    return (
      <div className="formatBox">
        <h1>Typescript Formatter</h1>
        <FormatText
          text={this.state.text}
          handleTextChange={this.handleTextChange} />
        <FormatOptions options={this.state.options} />
        <FormattedText formattedText={this.state.formattedText} />
      </div>
    )
  }
});

var FormatText = React.createClass({

  render: function() {
    return (
      <form className="FormatText" >
        <input type="text" placeholder=""
          value={this.props.text} onChange={this.props.handleTextChange} />
      </form>
    )
  }
});

var FormattedText = React.createClass({
  render: function() {
    return (
      <input type="text" value={this.props.formattedText} readOnly />
    )
  }
})

var FormatOptions = React.createClass({
  render: function() {
    return (
      <h2> hi</h2>
    );
  }
});

ReactDOM.render(
  <FormatBox />,
  document.getElementById('content')
);

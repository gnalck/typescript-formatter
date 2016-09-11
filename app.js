var formatCode = function(code, indentSize) {
  var options =  {
    BaseIndentSize: 0,
    IndentSize: indentSize,
    TabSize: indentSize,
    NewLineCharacter: "\n",
    ConvertTabsToSpaces: true,
    IndentStyle: ts.IndentStyle.Block,
    InsertSpaceAfterCommaDelimiter: true,
    InsertSpaceAfterSemicolonInForStatements: true,
    InsertSpaceBeforeAndAfterBinaryOperators: true,
    InsertSpaceAfterKeywordsInControlFlowStatements: true,
    InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
    InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
    InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
    InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
    InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
    InsertSpaceAfterTypeAssertion: false,
    PlaceOpenBraceOnNewLineForFunctions: false,
    PlaceOpenBraceOnNewLineForControlBlocks: false,
  }

  var applyEdits = function(text, edits) {
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
  };

  var format = function(input, options)  {
    var rulesProvider = new ts.formatting.RulesProvider();
    rulesProvider.ensureUpToDate(options);

    var sourceFile = ts.createSourceFile("input", input, ts.ScriptTarget.Latest);
    var edits = ts.formatting.formatDocument(sourceFile, rulesProvider, options);

    return applyEdits(input, edits);
  };

  return format(code, options);
};

var initText = `let  x= 5 ;
if   (!! x){
       console .log ( 'hello world!' );
}`;

var FormatBox = React.createClass({
  getInitialState: function() {
    return {
      formattedCode: '',
      indentSize: 4,
      code: initText,
    };
  },

  handleCodeChange: function(e) {
    this.setState({
      code: e.target.value,
    });
  },

  handleIndentChange: function(e) {
    this.setState({
      indentSize: e.target.value
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var formattedCode = formatCode(this.state.code, this.state.indentSize);

    this.setState({
      formattedCode: formattedCode
    })
  },

  render: function() {
    return (
      <div className="formatBox container">
        <div className="page-header">
          <h1>Typescript Formatter</h1>
        </div>
        <FormatForm
          code={this.state.code}
          handleCodeChange={this.handleCodeChange}
          indentSize={this.state.indentSize}
          handleIndentChange={this.handleIndentChange}
          handleSubmit={this.handleSubmit} />
        <FormattedCode formattedCode={this.state.formattedCode} />
      </div>
    )
  }
});

var FormatForm = React.createClass({
  render: function() {
    var numRows = this.props.code.split('\n').length;

    return (
      <form className="formatForm" onSubmit={this.props.handleSubmit}>
        <div className="form-group">
          <textarea rows={numRows} className="form-control" name="code" value={this.props.code} onChange={this.props.handleCodeChange} />
        </div>
        <FormatIndent indentSize={this.props.indentSize} handleIndentChange={this.props.handleIndentChange}/>
        <input type="submit" className="btn btn-primary center-block" value="Format"/>
      </form>
    );
  }
});

var FormatIndent = React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <select className="form-control" value={this.props.indentSize} onChange={this.props.handleIndentChange} >
          <option value="4">4 Space Tab</option>
          <option value="3">3 Space Tab</option>
          <option value="2">2 Space Tab</option>
        </select>
      </div>
    )
  }
})

var FormattedCode = React.createClass({
  render: function() {
    var numRows = this.props.formattedCode.split('\n').length;

    if (this.props.formattedCode) {
      return (
        <div className="formattedCode">
          <textarea name="formattedCode" rows={numRows} className="form-control" value={this.props.formattedCode} readOnly />
        </div>
      );
    }

    return <div></div>;
  }
});

ReactDOM.render(
  <FormatBox />,
  document.getElementById('content')
);

// import { log, read, unwatchFiles, watchFile, write } from '@jsxcad/sys';

import AceEditor from 'react-ace';
// import Prettier from 'prettier/standalone.js';
// import PrettierParserBabel from 'prettier/parser-babel.js';
import PrismJS from 'prismjs/components/prism-core';
import PropTypes from 'prop-types';
import React from 'react';

import { aceEditorAuxiliary } from './AceEditorAuxiliary';
import { aceEditorCompleter } from './AceEditorCompleter';
import { aceEditorSnippetManager } from './AceEditorSnippetManager';

import { prismJsAuxiliary } from './PrismJSAuxiliary';

if (!aceEditorAuxiliary) throw Error('die');
if (!prismJsAuxiliary) throw Error('die');

const snippetCompleter = {
  getCompletions: function (editor, session, position, prefix, callback) {
    const { row, column } = position;
    var scopes = ['JSxCAD'];
    var token = session.getTokenAt(row, column);
    var snippetMap = aceEditorSnippetManager.snippetMap;
    var completions = [];
    let isMethod = false;
    {
      const { start } = token;
      const previous = session.getTokenAt(row, start);
      if (previous !== null && previous.value === '.') {
        isMethod = true;
      }
    }
    scopes.forEach(function (scope) {
      var snippets = snippetMap[scope] || [];
      for (var i = snippets.length; i--; ) {
        var s = snippets[i];
        if (s.isMethod) {
          if (!isMethod) {
            continue;
          }
        }
        var caption = s.name;
        if (!caption) {
          continue;
        }
        completions.push({
          caption: caption,
          snippet: s.content,
          meta: s.meta,
          docHTML: s.docHTML,
          type: s.type,
        });
      }
    }, this);
    callback(null, completions);
  },
};

aceEditorCompleter.setCompleters([snippetCompleter]);

export class JsEditorUi extends React.PureComponent {
  static get propTypes() {
    return {
      ask: PropTypes.func,
      data: PropTypes.string,
      file: PropTypes.string,
      id: PropTypes.string,
      onRun: PropTypes.func,
      onSave: PropTypes.func,
      onChange: PropTypes.func,
      workspace: PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  saveShortcut() {
    return {
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: () => this.save(),
    };
  }

  runShortcut() {
    const { onRun } = this.props;
    return {
      name: 'run',
      bindKey: { win: 'Shift-Enter', mac: 'Shift-Enter' },
      exec: () => onRun(),
    };
  }

  async run() {
    this.props.onRun();
  }

  async save() {
    this.props.onSave();
  }

  async componentDidMount() {}

  async update() {}

  async componentWillUnmount() {}

  onValueChange(data) {
    this.props.onChange(data);
  }

  highlight(data) {
    return PrismJS.highlight(data, PrismJS.languages.js);
  }

  stop(e) {
    e.stopPropagation();
  }

  preventDefault(e) {
    e.preventDefault();
    return false;
  }

  onKeyDown(e) {
    const ENTER = 13;
    const S = 83;
    const SHIFT = 16;
    const CONTROL = 17;

    const key = e.which || e.keyCode || 0;

    switch (key) {
      case CONTROL:
      case SHIFT:
        return true;
    }

    const { ctrlKey, shiftKey } = e;
    switch (key) {
      case ENTER: {
        if (shiftKey) {
          e.preventDefault();
          e.stopPropagation();
          this.run();
          return false;
        }
        break;
      }
      case S: {
        if (ctrlKey) {
          e.preventDefault();
          e.stopPropagation();
          this.save();
          return false;
        }
        break;
      }
    }
  }

  render() {
    const { id } = this.props;
    const { data = '' } = this.props;

    return (
      <div onKeyDown={this.onKeyDown}>
        <AceEditor
          commands={[this.runShortcut(), this.saveShortcut()]}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            // enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            useWorker: false,
          }}
          height="100%"
          highlightActiveLine={true}
          key={id}
          mode="javascript"
          name={id}
          onChange={this.onValueChange}
          showGutter={true}
          showPrintMargin={true}
          theme="github"
          value={data}
          width="100%"
        />
      </div>
    );
  }
}

export default JsEditorUi;

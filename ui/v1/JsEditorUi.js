import { log, readFile, writeFile } from '@jsxcad/sys';

import AceEditor from 'react-ace';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import PrismJS from 'prismjs/components/prism-core';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/Row';

import { aceEditorAuxiliary } from './AceEditorAuxiliary';
import { prismJsAuxiliary } from './PrismJSAuxiliary';

if (!aceEditorAuxiliary) throw Error('die');
if (!prismJsAuxiliary) throw Error('die');

export class JsEditorUi extends React.PureComponent {
  static get propTypes () {
    return {
      ask: PropTypes.func,
      file: PropTypes.string,
      id: PropTypes.string
    };
  }

  constructor (props) {
    super(props);

    this.state = {
      code: ''
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.run = this.run.bind(this);
    this.save = this.save.bind(this);
  }

  saveShortcut () {
    return {
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: () => this.save()
    };
  }

  runShortcut () {
    return {
      name: 'run',
      bindKey: { win: 'Shift-Enter', mac: 'Shift-Enter' },
      exec: () => this.run()
    };
  }

  async run () {
    const { ask, file } = this.props;
    await this.save();
    log({ op: 'open' });
    const script = await readFile({}, file);
    const geometry = await ask({ evaluate: script });
    if (geometry) {
      await writeFile({}, 'geometry/preview', JSON.stringify(geometry));
    }
  }

  async save () {
    const { code } = this.state;
    await writeFile({}, this.props.file, code);
  }

  async componentDidMount () {
    const code = await readFile({}, this.props.file);
    this.setState({ code });
  }

  onValueChange (code) {
    this.setState({ code });
  }

  highlight (code) {
    return PrismJS.highlight(code, PrismJS.languages.js);
  }

  stop (e) {
    e.stopPropagation();
  }

  preventDefault (e) {
    e.preventDefault();
    return false;
  }

  onKeyDown (e) {
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

  render () {
    const { id } = this.props;
    const { code } = this.state;

    return (
      <Container style={{ height: '100%', display: 'flex', flexFlow: 'column' }}>
        <Row style={{ width: '100%', height: '100%', flex: '1 1 auto' }}>
          <Col style={{ width: '100%', height: '100%', overflow: 'auto' }} onKeyDown={this.onKeyDown}>
            <AceEditor
              commands={[this.runShortcut(), this.saveShortcut()]}
              editorProps={{ $blockScrolling: true }}
              setOptions={{ useWorker: false }}
              height='100%'
              highlightActiveLine={true}
              key={id}
              mode="javascript"
              name={id}
              onChange={this.onValueChange}
              showGutter={true}
              showPrintMargin={true}
              theme="github"
              value={code}
              width='100%'
            >
            </AceEditor>
          </Col>
        </Row>
        <Row style={{ flex: '0 0 auto' }}>
          <Col>
            <br/>
            <ButtonGroup>
              <Button size='sm'
                onClick={this.run}
                variant='outline-primary'>
                Run
              </Button>
              <Button size='sm'
                onClick={this.save}
                variant='outline-primary'>
                Save
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default JsEditorUi;
import { PluginComponent } from 'react-markdown-editor-lite';

class CheckBox extends PluginComponent<any, any> {
  static pluginName = 'Checkbox';
  // Position plugin
  static align = 'left';
  static defaultConfig = {
    checked: `[x] Item`,
    unChecked: `[ ] Item`,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      checked: this.getConfig('checked'),
      unChecked: this.getConfig('unChecked'),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Handle keydown
  handleKeyDown = (e: KeyboardEvent) => {
    // @ts-ignore
    if (e.target?.localName !== 'textarea') return; // If cursor didn't focused to textarea field. Nothing

    // If press Ctrl + [
    if (e.ctrlKey && e.key === '[') {
      this.handleCheckbox(false);
    }
    // If press Ctrl + ]
    else if (e.ctrlKey && e.key === ']') {
      this.handleCheckbox(true);
    }
  };

  handleCheckbox = (checked: boolean) => {
    if (checked) {
      this.editor.insertText(this.state.checked, true, { start: 4, end: 8 });
    } else {
      this.editor.insertText(this.state.unChecked, true, { start: 4, end: 8 });
    }
  };

  render() {
    return (
      <>
        <span className="button" title="Checkbox" onClick={() => this.handleCheckbox(false)}>
          <input type="checkbox" checked={false} readOnly style={{ cursor: 'pointer' }} />
        </span>
        <span className="button" title="Checkbox" onClick={() => this.handleCheckbox(true)}>
          <input type="checkbox" checked readOnly style={{ cursor: 'pointer' }} />
        </span>
      </>
    );
  }
}
export default CheckBox;

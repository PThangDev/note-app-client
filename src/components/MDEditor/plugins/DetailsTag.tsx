import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PluginComponent } from 'react-markdown-editor-lite';

class DetailsTag extends PluginComponent<any, any> {
  static pluginName = 'menu';
  // Position plugin
  static align = 'left';
  static defaultConfig = {
    menuTag: `<details>
  <summary>Menu collapse</summary>

  Content
</details>`,
  };

  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      menuTag: this.getConfig('menuTag'),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    // @ts-ignore
    if (e.target?.localName !== 'textarea') return;

    if (e.ctrlKey && e.code === 'KeyM') {
      this.handleClick();
    }
  };

  handleClick() {
    this.editor.insertText(this.state.menuTag, true, { start: 48, end: 55 });
  }

  render() {
    return (
      <span className="button" title="menu" onClick={this.handleClick}>
        <FontAwesomeIcon icon={faCaretRight} /> Menu
      </span>
    );
  }
}
export default DetailsTag;

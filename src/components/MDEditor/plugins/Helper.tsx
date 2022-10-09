import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PluginComponent } from 'react-markdown-editor-lite';

class Helper extends PluginComponent<any, any> {
  static pluginName = 'Tutorial Markdown';
  // Position plugin
  static align = 'right';
  static defaultConfig = {};

  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <a
        className="button"
        href="https://www.markdownguide.org/basic-syntax"
        target="_blank"
        title="Tutorial Markdown"
        rel="noreferrer"
        style={{ marginRight: '5px' }}
      >
        <FontAwesomeIcon icon={faInfoCircle} /> Tutorials
      </a>
    );
  }
}
export default Helper;

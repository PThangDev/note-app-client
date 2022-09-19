import {
  faBiohazard,
  faBook,
  faHouseUser,
  faIdCard,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PinIcon } from 'src/components/Icons';
import { routePaths } from 'src/configs';

const routes = [
  {
    to: routePaths.home.path,
    label: routePaths.home.label,
    icon: <FontAwesomeIcon icon={faHouseUser} />,
  },
  {
    to: routePaths.notes.path,
    label: routePaths.notes.label,
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    to: routePaths.topics.path,
    label: routePaths.topics.label,
    icon: <FontAwesomeIcon icon={faBiohazard} />,
  },
  {
    to: routePaths.pins.path,
    label: routePaths.pins.label,
    icon: <PinIcon />,
  },
  {
    to: routePaths.profile.path,
    label: routePaths.profile.label,
    icon: <FontAwesomeIcon icon={faIdCard} />,
  },
  {
    to: routePaths.trashs.path,
    label: routePaths.trashs.label,
    icon: <FontAwesomeIcon icon={faTrash} />,
  },
];
export default routes;

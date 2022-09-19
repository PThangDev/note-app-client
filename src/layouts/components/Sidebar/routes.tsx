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
    to: routePaths.home,
    label: 'Home',
    icon: <FontAwesomeIcon icon={faHouseUser} />,
  },
  {
    to: routePaths.notes.main,
    label: 'Notes',
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    to: routePaths.topics,
    label: 'Topics',
    icon: <FontAwesomeIcon icon={faBiohazard} />,
  },
  {
    to: routePaths.pins,
    label: 'Pins',
    icon: <PinIcon />,
  },
  {
    to: routePaths.profile,
    label: 'Profile',
    icon: <FontAwesomeIcon icon={faIdCard} />,
  },
  {
    to: routePaths.trashs,
    label: 'Trashs',
    icon: <FontAwesomeIcon icon={faTrash} />,
  },
];
export default routes;

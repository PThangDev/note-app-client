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
    label: 'Home',
    to: routePaths.home,
    icon: <FontAwesomeIcon icon={faHouseUser} />,
    end: true,
  },
  {
    label: 'Notes',
    to: routePaths.notes,
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    label: 'Topics',
    to: routePaths.topics,
    icon: <FontAwesomeIcon icon={faBiohazard} />,
  },
  {
    label: 'Pins',
    to: routePaths.pins,
    icon: <PinIcon />,
  },
  {
    label: 'Profile',
    to: routePaths.profile,
    icon: <FontAwesomeIcon icon={faIdCard} />,
  },
  {
    label: 'Trashs',
    to: routePaths.trashs,
    icon: <FontAwesomeIcon icon={faTrash} />,
  },
];
export default routes;

// Modal
export interface ModalProps {
  onClickNo: React.MouseEventHandler<HTMLButtonElement>;
  onClickYes: React.MouseEventHandler<HTMLButtonElement>;
}

// Alert
export interface AlertProps {
  message: string;
  className: string;
}

// FavRestaurant
export interface FavRestaurantProps {
  name: string;
  _id: string;
  children: JSX.Element;
}

// FormField
export interface FormFieldProps {
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// Navigation
export interface NavigationProps {
  id: string;
}

// RestaurantInfo
export interface RestaurantInfoProps {
  tasks: {
    _id: string;
    username: string;
    title: string;
    category: string;
    description: string;
  }[];
  restaurantID: string;
}

export interface ITask {
  username?: string;
  title: string;
  category: string;
  description: string;
  _id?: string;
}

export interface IUserID {
  _id: string;
}

// CreateRestaurant
export interface ICreateRestaurantInitialFormState {
  name: string;
  password: string;
  repeatedPassword: string;
}

export interface ICreateRestaurantInitialFormIDState {
  id: string;
}

// Login
export interface LoginIFormValues {
  username: string;
  password: string;
}

// Register
export interface RegisterIFormValues {
  username: string;
  password: string;
  description: string;
  restaurantName: string;
  repeatedPassword: string;
}

// RestaurantProfile
export interface RestaurantProfileIRestaurant {
  name: string;
  _id: string;
  tasks: [];
}

// UserProfile
export interface IUserInfo {
  username: string;
  description: string;
  restaurantName: string;
  _id: string;
  favRestaurants?: {
    name: string;
  }[];
}

// UserFavRestaurant
export interface IRestaurantsInfo {
  name: string;
  _id: string;
}

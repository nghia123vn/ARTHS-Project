import { useNavigate, NavigateFunction } from 'react-router-dom';

export const History = {
    navigate: null as NavigateFunction | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    push: (page: string) => {
        if (History.navigate) {
            History.navigate(page);
        }
    },
};

const NavigateSetter = () => {
    History.navigate = useNavigate();

    return null;
};

export default NavigateSetter;

import styles from './SearchFilter.module.scss';
import SelectDef from '@/components/SelectDef/SelectDef';

const mock = [
    {
        label: 'select 1',
        value: '1',
    },
    {
        label: 'select 1',
        value: '1',
    },
    {
        label: 'select 1',
        value: '1',
    },
]


const SearchFilter = () => {
    return (
        <div className={styles.wrapper}>
            <SelectDef
                placeholder='Страна'
                value=''
                list={mock}
                />
        </div>
    )
}

export default SearchFilter;
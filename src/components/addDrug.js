import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { Button, Form } from 'antd';
import { TextField } from '@mui/material';
import { Add } from '@mui/icons-material';


const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 8,
            borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
                }`,
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
            {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

function PopperComponent(props) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
    anchorEl: PropTypes.any,
    disablePortal: PropTypes.bool,
    open: PropTypes.bool.isRequired,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
        }`,
    borderRadius: 6,
    width: 600,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
        }`,
    '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `0px 0px 0px 3px ${theme.palette.mode === 'light'
                ? 'rgba(3, 102, 214, 0.3)'
                : 'rgb(12, 45, 107)'
                }`,
            borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
        },
    },
}));

const StyledButton = styled(ButtonBase)(({ theme }) => ({
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    paddingBottom: 8,
    color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
    fontWeight: 600,
    '&:hover,&:focus': {
        color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff',
    },
    '& span': {
        width: '100%',
    },
    '& svg': {
        width: 16,
        height: 16,
    },
}));

export default function AddDrug({ value, onChange, options }) {
    let labels = options
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drugs, setdrugs] = React.useState([]);
    const [pendingdrugs, setPendingdrugs] = React.useState(null);
    const theme = useTheme();
    const [input, setinput] = React.useState(value || 0);
    const [mounted, setMounted] = React.useState(false);



    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

        setPendingdrugs(null)

        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };



    React.useEffect(() => {
        drugs.length > 0 ? setinput(drugs) : setinput(undefined);
        if (typeof onChange === 'function') {
            drugs.length > 0 ? onChange(drugs) : onChange();

        }
    }, [drugs])

    const removeItem = (id) => {
        setdrugs(drugs.filter(item => item.id !== id));
    };

    const handleAdd = () => {
        console.log(pendingdrugs)
        if (pendingdrugs) {

            setdrugs(prevArray => [...prevArray, pendingdrugs]);





        }
        console.log(pendingdrugs)
        setPendingdrugs(null)

        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;
    console.log(drugs)
    return (
        <div className="p-2 overflow-hidden border rounded-lg max-h-[11rem] w-fit ">
            <Box sx={{ width: 221, fontSize: 13 }}>
                <StyledButton disableRipple aria-describedby={id} onClick={handleClick}>
                    <span>Drugs</span> {drugs.length ? <p className='bg-green-500 text-white rounded-[50%] w-6 h-6  flex justify-center items-center'>{drugs.length}</p> : null}
                    <Add />
                </StyledButton>
                <div className="p-2 overflow-scroll scroll-smooth max-h-40 scrollbar-hide">

                    {
                        drugs.length === 0 ? <p>Add drug </p> : null
                    }
                    {drugs.map((option) => {
                        return (<div key={option._id} className='grid grid-cols-3 p-2 my-2 border rounded-md'>
                            <div

                                className='col-span-2'

                            >
                                <p className='text-[1.05rem] text-gray-600' > {option.drugName}</p>
                                <p className='text-[1rem] text-gray-500' > {"Dose: " + option.dose + "mg"}</p>
                                <p className='text-[1rem] text-gray-500' > {"Amount: " + option.amount}</p>


                            </div>
                            <div className='flex items-center justify-end h-full col-span-1' >
                                <Button size='small' danger type='primary' onClick={() => { removeItem(option.id) }}  >X</Button>
                            </div>
                        </div>
                        )
                    })}
                </div>

            </Box>
            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <div className='grid w-full grid-cols-2'>
                        <div>
                            <Box
                                sx={{
                                    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
                                        }`,
                                    padding: '8px 10px',
                                    fontWeight: 600,
                                }}
                            >
                                Select drug to add
                            </Box>
                            <Autocomplete
                                open

                                drugs={pendingdrugs}
                                onChange={(event, newdrugs, reason) => {
                                    if (
                                        event.type === 'keydown' &&
                                        (event.key === 'Backspace' || event.key === 'Delete') &&
                                        reason === 'removeOption'
                                    ) {
                                        return;
                                    }
                                    setPendingdrugs(newdrugs);
                                }}
                                disableCloseOnSelect

                                PopperComponent={PopperComponent}
                                renderTags={() => null}
                                noOptionsText="No drugs"
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>

                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                '& span': {
                                                    color:
                                                        theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                                                },
                                            }}
                                        >
                                            {option.drugName}
                                            <br />
                                            <span>{option.drugName}</span>
                                        </Box>

                                    </li>
                                )}
                                options={labels.filter(label => !drugs.some(drugss => label.drugName === drugss.drugName))}
                                getOptionLabel={(option) => option.drugName}
                                renderInput={(params) => (
                                    <StyledInput
                                        ref={params.InputProps.ref}
                                        inputProps={params.inputProps}
                                        autoFocus
                                        placeholder="Filter Drugs"
                                    />
                                )}
                            />
                        </div>
                        <div className='flex flex-col p-5 pt-20 space-y-3 ' >
                            <Form
                                onFinish={(drugss) => {

                                    let newDrug = pendingdrugs
                                    newDrug.dose = drugss.dose
                                    
                                    newDrug.amount = drugss.amount
                                    setPendingdrugs(newDrug)
                                    handleAdd()

                                }}
                            >
                                <Form.Item
                                    name="dose"
                                    rules={[{ required: true }]}


                                >
                                    <TextField className='w-[100%]' size='small' label="Dose" placeholder='Dosage in mg' type='number' />
                                </Form.Item>
                                <Form.Item
                                    name="amount"
                                    rules={[{ required: true }]}


                                >
                                    <TextField className='w-[100%]' size='small' label="Amount" placeholder='Number of pills/injections' type='number' />
                                </Form.Item>
                                <div className='flex justify-center'>
                                    <Form.Item

                                    >
                                        <Button htmlType='submit' type='primary' disabled={!pendingdrugs} >Add</Button>

                                    </Form.Item>
                                </div>
                            </Form>

                        </div>
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </div>
    );
}


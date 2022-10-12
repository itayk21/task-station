import React from 'react'
import { Header } from '../header/Header'
import TabPanel from '@mui/lab/TabPanel';



import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Contact from '../body/Contact';
import Tasks from '../body/Tasks';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Active_workers from '../body/Active_workers';
import { red } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';




export const Main = () => {

    // <BrowserRouter>
    // <Route>

    //     <Route path='/Tasks' element={<Tasks/>}/>
    //     <Route path='/Contact' element={<Contact/>}/>

    // </Route>


    // </BrowserRouter>



    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue,) => {
        setValue(newValue);
    };


    return (
        <div className='container'>
            <div className='header'>
                <Header />

            </div>
            <div className='tabsContainer'>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="WORKERS" icon={<EngineeringIcon className='worker' />} value="1" />
                                <Tab label="TASKS" icon={<TaskAltIcon className='task' />} value="2" />
                                <Tab label="MAIL" icon={<EmailIcon className='mail-logo' />} value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Active_workers />
                        </TabPanel>
                        <TabPanel value="2">
                            <Tasks />
                        </TabPanel>
                        <TabPanel value="3">
                            <Contact />
                        </TabPanel>
                    </TabContext>
                </Box>


            </div>




            <div>



            </div>





            {/* <div>
                <Contact/>
            </div>
            <div>
                <Tasks/>
            </div> */}


        </div>

    )

}
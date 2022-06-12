import React from 'react';
import PageContent from '../PageContent';
import SideBar from '../SideBar';

function DashBoard(props) {
    return (
        <div className='w-full h-screen grid grid-cols-4'>
            <SideBar />
            <PageContent/>
        </div>
    );
}

export default DashBoard;
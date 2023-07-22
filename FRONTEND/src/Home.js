import React, { Component } from 'react';

export class Home extends Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' }}>
                <div>
                    <h3>Welcome to ezPC!</h3>
                    <p>
                        This website allows YOU to easily check the compatibility of the PC parts you have chosen for building your own PC! Building a PC can be an exciting and rewarding experience. Whether you're a hardcore gamer, a creative professional, or just looking to upgrade your old system, knowing that all your chosen components will work together seamlessly is crucial.
                        <br /><br />
                        With ezPC, you can effortlessly verify the PHYSICAL compatibility of your Motherboard, GPU length, Cases and more! No more worries about buying incompatible parts or spending hours researching compatibility charts. Our user-friendly interface and comprehensive database ensure that you can quickly find the information you need to make informed decisions about your PC build.
                        <br /><br />
                        Are you ready to embark on your PC-building journey? Let ezPC be your guide, and start building your dream PC today!
                    </p>
                    <h3>How to use?</h3>
                    <h4>For users</h4>
                    <ol>
                        <li>Start by navigating to the "Users" page from the top navigation bar.</li>
                        <li>On the "Users" page, you will find a curated database where you can select/search for your desired components specs, such as the Size, GPU length, and Manufacturer.</li>
                        <li>As you select each component, ezPC will automatically check for compatibility, and any incompatible cases will be filtered out!</li>
                        <li>If you want to check the price of a particular case, you can click on the "Check Price" button on the right, assuming the case is still being sold.</li>
                        <li>Use the filters and sorting options available on the "User" page to narrow down your choices and find the perfect components for your build.</li>
                        <li>Happy building!</li>
                    </ol>
                    <h4>For admins</h4>
                    <p>As an admin, you have access to additional features:</p>
                    <ol>
                        <li>Start by navigating to the "Admin" page from the top navigation bar.</li>
                        <li>On the "Admin" page, you will find a login form.</li>
                        <li>Enter the following credentials:</li>
                        <ul>
                            <li>Username: admin</li>
                            <li>Password: password</li>
                        </ul>
                        <li>Once logged in, you will be able to add, edit, or delete components and their specifications in the database.</li>
                        <li>Make sure to log out when you're done with admin tasks to ensure the security of your account.</li>
                        <li>For added security, you will be logged out whenever you close the page.</li>
                    </ol>
                </div>
            </div>
        );
    }
}

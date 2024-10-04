"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {useRouter} from 'next/navigation';
import {ClipLoader} from 'react-spinners';
import instance from '@/utils/axios';
import {useAppDispatch, useAppSelector} from '@/app/redux/hooks';
import {RootState} from '@/app/redux/store';
import {getAllNews} from '@/app/redux/feature/news/api';

interface AddNewsPopupProps {
    onClose: () => void;
}

interface NewsItem {
    title: string;
    description: string;
    icon: string;
    _id?: any;
}

const NewsPage: React.FC = () => {
    const [showAddPopup, setShowAddPopup] = useState( false );
    const dispatch = useAppDispatch();
    const {news,loading,error} = useAppSelector((state:RootState) => state.news); 
    
    useEffect( () => {
        dispatch(getAllNews) 
    }, [] );

    return (
        <div className="ml-64 bg-[#0A090F] container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">News Management</h1>
                <button
                    onClick={() => setShowAddPopup( true )}
                    className="bg-[#0A090F] border border-neutral-600 text-[#7B7A7F] px-4 py-1.5 rounded"
                >
                    Add News
                </button>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <div className="overflow-x-auto pt-4">
                    {error ? (
                        <div className="text-red-500 text-center py-4">{error}</div>
                    ) : (
                        <table className="min-w-full bg-[#0A090F] text-[#7B7A7F] rounded-md">
                            <thead>
                                <tr className="bg-[#0A090F] border-b border-[#28272D] text-white text-left">
                                    <th className="py-3 px-4">S.No</th>
                                    <th className="py-3 px-4">Icon</th>
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Description</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading  ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4">
                                            <ClipLoader color="#DF841C" size={50} />
                                        </td>
                                    </tr>
                                ) : news.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4">No Posts Found</td>
                                    </tr>
                                ) : (
                                    news.map( ( post:any, index ) => (
                                        <tr key={post?._id || index} className="border-b border-[#28272D] hover:bg-[#28272D] cursor-pointer">
                                            <td className="py-3 px-4 text-left">{index + 1}</td>
                                            <td className="py-3 px-4 text-left">{post?.icon || 'N/A'}</td>
                                            <td className="py-3 px-4 text-left">{post?.title || 'N/A'}</td>
                                            <td className="py-3 px-4 text-left">{post?.description || 'N/A'}</td>
                                            <td className="py-3 px-4 text-left flex justify-center gap-2">
                                                <FaEdit className="cursor-pointer" />
                                                <FaTrash className="text-red-500 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ) )
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                {showAddPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setShowAddPopup( false )}>
                        <div onClick={( e ) => e.stopPropagation()}>
                            <AddNewsPopup onClose={() => setShowAddPopup( false )} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const AddNewsPopup: React.FC<AddNewsPopupProps> = ( {onClose} ) => {
    const [isLoading, setIsLoading] = useState( false );
    const [newsItem, setNewsItem] = useState<NewsItem>( {title: '', description: '', icon: '📰', } );
    const dispatch = useAppDispatch();
    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setNewsItem( {...newsItem, [e.target.name]: e.target.value} );
    };

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        setIsLoading( true );
        try {
            await instance.post( '/news', newsItem );
            alert( 'News item added successfully!' );
            setNewsItem( {title: '', description: '', icon: '📰'} );
            dispatch( getAllNews ) 
            onClose();
        } catch ( error ) {
            console.error( 'Error adding news item:', error );
            alert( 'Failed to add news item' );
        } finally {
            setIsLoading( false );
        }
    };

    return (
        <div className=" bg-[#0A090F] ">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Add News Item</h1>
                    <button onClick={onClose} className="text-white hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newsItem.title}
                            onChange={handleChange}
                            placeholder="Enter news title"
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={newsItem.description}
                            onChange={handleChange}
                            placeholder="Enter news description"
                            required
                            rows={4}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="icon" className="block text-sm font-medium text-gray-300 mb-2">
                            Icon
                        </label>
                        <select
                            id="icon"
                            name="icon"
                            value={newsItem.icon}
                            onChange={( e ) => setNewsItem( {...newsItem, icon: e.target.value} )}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="📰">📰 Newspaper</option>
                            <option value="🗞️">🗞️ Rolled-up Newspaper</option>
                            <option value="📣">📣 Megaphone</option>
                            <option value="📅">📅 Calendar</option>
                            <option value="🎉">🎉 Party Popper</option>
                            <option value="🏆">🏆 Trophy</option>
                            <option value="💡">💡 Light Bulb</option>
                            <option value="🌟">🌟 Star</option>
                            <option value="🔔">🔔 Bell</option>
                            <option value="✨">✨ Sparkles</option>
                            <option value="💎">💎 Diamond (Blockchain)</option>
                            <option value="🔗">🔗 Chain Link</option>
                            <option value="🔒">🔒 Lock (Security)</option>
                            <option value="📊">📊 Chart (Market)</option>
                            <option value="💰">💰 Money Bag (Cryptocurrency)</option>
                            <option value="🖥️">🖥️ Computer (Mining)</option>
                            <option value="🌐">🌐 Globe (Decentralization)</option>
                            <option value="📈">📈 Upward Trend</option>
                            <option value="🔑">🔑 Key (Private Key)</option>
                            <option value="📡">📡 Satellite (Network)</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500  text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? ' Adding News Item...' : ' Add News Item'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsPage;
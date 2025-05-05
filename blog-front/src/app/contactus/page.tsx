import React from 'react'
import data from './data.json'; // 假设数据存储在 data.json 文件中

const Contactus = () => {



    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">比赛列表</h1>
            {data.value.matchInfoList.map((matchInfo) => (
                <div key={matchInfo.businessDate} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{matchInfo.businessDate}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {matchInfo.subMatchList.map((match) => (
                            <div
                                key={match.matchId}
                                className="bg-slate-200 rounded-lg shadow-md p-4"
                            >
                                <h3 className="text-lg font-bold mb-2">
                                    {match.homeTeamAbbName} vs {match.awayTeamAbbName}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    {match.leagueAllName} - {match.matchWeek}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    {match.matchTime} - {match.matchDate}
                                </p>
                                <div className="flex justify-between mb-2">
                                    <span className="text-green-600 font-bold">
                                        {match.ttg.s1}
                                    </span>
                                    <span className="text-red-600 font-bold">
                                        {match.ttg.s2}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    {Object.entries(match.ttg).filter(([key]) => key.startsWith('s') && key.length === 2).map(([key, value], index) => (
                                        <div key={key} className="bg-gray-300 rounded-md py-1 px-2 text-center">
                                            <span>
                                                {value}:
                                                <span className="text-red-600 inline">
                                                    {index >= 7 ? "+" : ""}
                                                    {index}
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <span>更新日期: {match.ttg.updateDate} {match.ttg.updateTime}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Contactus
import React, {useEffect, useState} from 'react';

import border from '../../assets/iron_border.png'

interface Rank {
    challenge: any
}

const RankImage: React.FC<Rank> = ({ challenge }: Rank) => {

    const [imagePath, setImagePath] = useState('unranked.png')
    const [borderPath, setBorderPath] = useState('unranked_border.png')

    const {division, totalElo} = challenge.division


    useEffect(()=>{

        if(division) {
            if(division !== 'Challenger' && division !== 'Master' && division !== 'GrandMaster'){
                setBorderPath(`${division.toLowerCase().split(' ')[0]}_border.png`)
                setImagePath(`${division.toLowerCase().replace(' ','_')}.png`)
            }else{
                setBorderPath(`${division.toLowerCase()}_border.png`)
                setImagePath(`${division.toLowerCase()}.png`)
            }
        }
    }, [challenge.division])



    return (
        <div className={'rank-wrapper offset-5'}>
            {

                    <div>
                       <div className={'rank-inner-wrapper'}>
                           <h4 className={'rank-title'}>{challenge.title}</h4>

                           <img className={'rank-image'} src={require(`../../assets/${imagePath}`)} alt={division}  />
                           <div className={'rank-div-text'}>
                               <div>
                                   <b className={'text-135'}>{division ? division: 'Unranked'}</b>
                                   <div>
                                       {division? <b>{totalElo} LP</b> : 'Good luck'}
                                   </div>
                               </div>
                           </div>
                       </div>
                        <div>
                            <img className={'rank-border'} src={require(`../../assets/${borderPath}`)} alt={`${division} trim`}/>
                        </div>
                        <div className={'text-left mt-4'}>
                            <div>
                                <b>Target value</b>
                            </div>
                            <div>
                                {challenge.cutoff}
                            </div>
                            <div>
                                <b>Challenge type</b>
                            </div>
                            <div>
                                {challenge.type}
                            </div>
                            <div>
                                <b>Starting date</b>
                            </div>
                            <div>
                                {new Date(challenge.createdAt).toISOString().slice(0,10)}
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default RankImage;
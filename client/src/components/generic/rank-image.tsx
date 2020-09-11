import React, {useEffect, useState} from 'react';

import border from '../../assets/iron_border.png'

interface Rank {
    challenge: any
}

const RankImage: React.FC<Rank> = ({ challenge }: Rank) => {
    const {totalElo, division } = challenge.division

    const div = 'silver_iv.png'
    const [imagePath, setImagePath] = useState('iron_iv.png')
    const [borderPath, setBorderPath] = useState('iron_border.png')


    useEffect(()=>{


        if(totalElo !== 0) {
            if(division !== 'Challenger' && division !== 'Master' && division !== 'GrandMaster'){
                const imagePath = `${division.toLowerCase().replace(' ','_')}.png`
                const borderPath = `${division.toLowerCase().split(' ')[0]}_border.png`
                setBorderPath(borderPath)
                setImagePath(imagePath)
            }else{
                const imagePath = `${division.toLowerCase()}.png`
                const borderPath = `${division.toLowerCase()}_border.png`
                setBorderPath(borderPath)
                setImagePath(imagePath)
            }
        }


    }, [division])



    return (
        <div className={'rank-wrapper offset-5'}>
            {
                totalElo !== 0 &&
                    <div>
                       <div className={'rank-inner-wrapper'}>
                           <h4 className={'rank-title'}>{challenge.title}</h4>

                           <img className={'rank-image'} src={require(`../../assets/${imagePath}`)} alt={division}  />
                           <div className={'rank-div-text'}>
                               <b className={'text-135'}>{division}</b>
                               <div>
                                   <b>{totalElo} LP</b>
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
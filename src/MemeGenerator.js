import React from 'react'

class MemeGenerator extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            topText: '',
            bottomText:'',
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(blob => blob.json())
            .then(response => {
                const {memes} = response.data
                this.setState( {
                    allMemeImages: memes
                })
                
            })  
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({ 
            [name] : value
        });

    }

    handleSubmit(e){
        e.preventDefault();
        const randomNumber= Math.floor(Math.random() * this.state.allMemeImages.length);
        const randomMemeImg = this.state.allMemeImages[randomNumber].url;
        this.setState({
            randomImg: randomMemeImg
        }) 
    }
    render(){
        return(
            <div className="">
                <h2 className="center-text">WE LIVE IN A SOCIEDAD</h2>
                <form className="flex-container" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="topText" 
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                        
                    <input 
                        type="text" 
                        name="bottomText" 
                        placeholder='Bottom Text'
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />

                    <button className="boton-meme">Generate

                    </button>
                </form>
                <div className="flex-container meme">
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className="text-top">{this.state.topText}</h2>
                    <h2 className="text-bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}
export default MemeGenerator
import {render , screen , cleanup} from '@testing-library/react'
import ReposList from '../ReposList'

test('should render RepoList component',()=>{
    render(<ReposList/>)
    const repoElement = screen.getByTestId('reposComponent')
    expect(repoElement).toBeInTheDocument();
    
    
})

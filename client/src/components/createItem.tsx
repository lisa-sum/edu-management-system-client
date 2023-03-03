import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { useEffect } from 'react'
import { getCollege } from '@/api/getCollege'

const filter = createFilterOptions<FilmOption[]>()

export default function CreateOptionDialog() {
	const [value, setValue] = React.useState<FilmOption[] | null>(null)
	const [open, toggleOpen] = React.useState(false)
	const handleClose = () => {
		setDialogValue({
			name: '',
			info: '',
		})
		toggleOpen(false)
	}

	const [dialogValue, setDialogValue] = React.useState({
		name: '',
		info: '',
	})

	useEffect(() => {
		getCollege()
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setValue({
			name: dialogValue.name,
			info: dialogValue.info,
		})
		handleClose()
	}

	return (
		<>
			<Autocomplete
				clearOnBlur
				freeSolo
				handleHomeEndKeys
				selectOnFocus
				filterOptions={(options, params) => {
					const filtered = filter(options, params)

					if (params.inputValue !== '') {
						filtered.push({
							inputValue: params.inputValue,
							name: `增加 "${params.inputValue}"学院`,
						})
					}

					return filtered
				}}
				getOptionLabel={(option) => {
					// e.g value selected with enter, right from the input
					if (typeof option === 'string') {
						return option
					}
					if (option.inputValue) {
						return option.inputValue
					}
					return option.name
				}}
				id="dialog"
				options={value}
				renderInput={(params) => (
					<TextField
						{...params}
						label="选择或新增学院"
					/>
				)}
				renderOption={(props, option) => <li {...props}>{option.title}</li>}
				sx={{ width: 300 }}
				value={value}
				onChange={(_event, newValue) => {
					if (typeof newValue === 'string') {
						// timeout to avoid instant validation of the dialog's form.
						setTimeout(() => {
							toggleOpen(true)
							setDialogValue({
								name: newValue,
								info: '',
							})
						})
					} else if (newValue?.inputValue) {
						toggleOpen(true)
						setDialogValue({
							name: newValue.inputValue,
							info: '',
						})
					} else {
						setValue(newValue)
					}
				}}
			/>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<form onSubmit={handleSubmit}>
					<DialogTitle>Add a new film</DialogTitle>
					<DialogContent>
						<DialogContentText>Did you miss any film in our list? Please, add it!</DialogContentText>
						<TextField
							autoFocus
							id="name"
							label="title"
							margin="dense"
							type="text"
							value={dialogValue.name}
							variant="standard"
							onChange={(event) =>
								setDialogValue({
									...dialogValue,
									info: event.target.value,
								})
							}
						/>
						<TextField
							id="name"
							label="year"
							margin="dense"
							type="number"
							value={dialogValue.name}
							variant="standard"
							onChange={(event) =>
								setDialogValue({
									...dialogValue,
									info: event.target.value,
								})
							}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Add</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	)
}
